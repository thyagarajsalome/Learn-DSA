# Module 6: Stacks & Applications

A Stack is a linear data structure that restricts access to elements based on a strict ordering rule: **LIFO (Last In, First Out)**.

---

## 1. The LIFO Principle

### ❓ What is LIFO?
The last item pushed onto the stack is the first item popped off. Think of a stack of dinner plates: you can only add a plate to the top, and you can only remove a plate from the top.

```
       [ 30 ]  <── Top (Only access here)
       [ 20 ]
       [ 10 ]
```

### 🔍 Core Operations (All run in $O(1)$ time)
- `push(val)`: Adds an item to the top.
- `pop()`: Removes and returns the top item.
- `peek()`: Returns the top item without removing it.

---

## 2. Stack Implementations

1. **Array-based Stack**: Fast, but has a fixed maximum capacity. Uses an integer variable `top` to keep track of the current index index.
2. **Linked List-based Stack**: Grows dynamically on heap, but uses more memory due to pointer storage. The `Head` of the list acts as the stack's `top`.

---

## 3. Real-World Applications

### 🔹 Parentheses Balancing (`{ ( [ ] ) }`)
Compilers use stacks to match opening and closing brackets in source files:
- Scan characters:
  - If opening bracket `(`, `[`, `{`, **Push** to stack.
  - If closing bracket `)`, `]`, `}`, **Pop** from stack and verify it matches the popped type.
- If stack is empty when file scan finishes, code is balanced!

### 🔹 Infix to Postfix Conversion
Humans write expressions in **Infix** format ($A + B$). Computers evaluate expressions faster in **Postfix** format ($A\ B\ +$) because postfix does not require parentheses or order-of-operation rules. Stacks are used to store operator precedence states during this conversion.

💻 **Undo Operation Analogy**:
Every time you type a letter in Microsoft Word, the action is **pushed** onto an Undo Stack. Pressing **Ctrl + Z** pops the most recent action off the stack and reverses it.
