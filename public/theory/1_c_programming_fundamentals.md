# Module 1: C Programming Fundamentals

Before studying Data Structures, we must master the tools used to build them. In C, these tools are **Pointers, Structures, and Dynamic Memory Allocation**.

---

## 1. Pointers: Direct Memory Access

### ❓ What is a Pointer?
A pointer is a variable that stores the **memory address** of another variable, rather than a direct value.

### 💡 Why do we need it?
1. **Pass-by-Reference**: Allows functions to modify variables in other scopes without copying large datasets.
2. **Linked Structures**: Without pointers, we cannot link node elements together to form Linked Lists, Trees, or Graphs.

### 🔍 How does it work?
Memory is like a giant grid of post boxes, where each box has a unique number (address).
- `&` (Address-of operator) gets the box number.
- `*` (Dereference operator) reads or writes the content inside that box.

```c
int num = 42;
int *ptr = &num; // ptr holds the memory address of num

printf("Address: %p\n", ptr); // prints something like 0x7ffeefbff568
printf("Value: %d\n", *ptr);   // prints 42
```

🧠 **Real-World Analogy**: A pointer is like a **URL**. The URL is not the website itself; it is just a string pointing to where the website's files reside on a remote server. Clicking the URL (dereferencing) takes you directly to the content.

---

## 2. Structures: Creating Custom Data Types

### ❓ What is a Structure?
A Structure (`struct`) is a user-defined data type that groups related variables of different types under a single name.

### 💡 Why do we need it?
In DSA, a "Node" represents a complex entity. For example, a LinkedList Node needs to store both a **data value** (like an integer) and a **pointer link** to the next node. A structure lets us bind them together.

### 🔍 How does it work?
```c
struct Node {
    int data;           // The payload
    struct Node *next;  // Link to another node of the same type
};
```

---

## 3. Dynamic Memory Allocation: Heap Management

### ❓ What is Dynamic Memory Allocation?
It is the process of requesting memory from the **Heap** at runtime, rather than letting the compiler allocate fixed stack sizes.

### 💡 Why do we need it?
1. **Static limitations**: If you declare `int arr[100];`, your array can never hold 101 elements, and wastes memory if you only store 2 elements.
2. **Persistence**: Stack memory is destroyed when a function exits. Heap memory remains allocated until you explicitly free it, allowing structures to grow dynamically.

### 🔍 How does it work?
- `malloc(size)`: Reserves raw bytes on the heap. Returns a pointer.
- `free(ptr)`: Releases the reserved heap memory back to the system to prevent **Memory Leaks**.

💻 **Dynamic Allocation Example:**
```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    // Request memory for a single Node structure on the heap
    struct Node *first = (struct Node *)malloc(sizeof(struct Node));
    
    if (first == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    first->data = 100;
    first->next = NULL;
    
    printf("Node data: %d\n", first->data);
    
    // Always free memory when done to prevent resource leaks
    free(first);
    return 0;
}
```

⚠️ **Caution (Memory Leaks)**: If you allocate memory using `malloc` and discard the pointer without calling `free(ptr)`, that memory remains locked and unusable. Over time, your application will consume all available system RAM and crash.
