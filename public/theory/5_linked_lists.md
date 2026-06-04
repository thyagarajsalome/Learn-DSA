# Module 5: Linked Lists

While arrays are fixed contiguous memory slots, Linked Lists are dynamic, non-contiguous chains of nodes connected by pointers.

---

## 1. Why Linked Lists? (Arrays vs. Lists)

| Feature | Array | Linked List |
| :--- | :--- | :--- |
| **Memory Allocation** | Contiguous (Single Block) | Non-contiguous (Nodes spread on Heap) |
| **Size** | Fixed at declaration | Dynamic (Grows/Shrinks on demand) |
| **Insertion/Deletion** | Slow $O(N)$ (requires shifting elements) | Fast $O(1)$ (just swap pointer addresses) |
| **Access Time** | Fast $O(1)$ (using direct index math) | Slow $O(N)$ (requires traversal from Head) |

---

## 2. Linked List Architectures

```
Singly:   [Data | Next] ──► [Data | Next] ──► NULL
Doubly:   NULL ◄── [Prev | Data | Next] ⇄ [Prev | Data | Next] ──► NULL
Circular: [Data | Next] ──► [Data | Next] ──┐
             ▲                              │
             └──────────────────────────────┘
```

1. **Singly Linked List**: Nodes link forward only. Each node has one pointer to the next.
2. **Doubly Linked List**: Nodes link forward and backward. Each node has `prev` and `next` pointers. Allows bidirectional traversal.
3. **Circular Linked List**: The last node points back to the first node instead of pointing to `NULL`.

---

## 3. Link Swapping Operations

To insert or delete a node, we never shift elements; we only re-assign pointer address paths.

### 🔹 Singly Insertion at Head
1. Create a new Node.
2. Point New Node's `next` to the current `Head`.
3. Re-assign `Head` to point to the New Node.

```c
struct Node* insertAtHead(struct Node* head, int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    
    newNode->next = head; // Point new node to old head
    head = newNode;       // New node becomes the new head
    
    return head;
}
```

🧠 **Real Use Case (Music Playlist)**:
Doubly Circular lists power music players. When you click **Next**, it navigates via the `next` pointer. Clicking **Prev** moves via `prev`. The list is circular, so clicking **Next** on the final track cycles back to the very first song seamlessly.
