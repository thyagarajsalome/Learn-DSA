# Module 7: Queues & Ring Buffers

A Queue is a linear data structure that operates on a **FIFO (First In, First Out)** access pattern.

---

## 1. The FIFO Principle

### ❓ What is FIFO?
The first element added to the queue is the first one removed. Just like a ticket queue: the person who gets in line first gets served first.

```
Enqueue (Rear) ──► [ 30 | 20 | 10 ] ──► Dequeue (Front)
```

### 🔍 Core Operations (Both run in $O(1)$ time)
- `enqueue(val)`: Insert at the **Rear** pointer.
- `dequeue()`: Remove from the **Front** pointer.

---

## 2. The Circular Queue (Ring Buffer)

### ❓ What is it?
In a standard linear array-based queue, dequeueing items advances the `front` pointer, leaving unusable empty spaces at the beginning of the array. A **Circular Queue** wraps the pointers back to the index `0` using **Modulo arithmetic** once they reach the end.

```
       [ Empty | 10 | 20 | 30 ]  
          ▲                ▲
        Front             Rear
   (If we enqueue, Rear wraps around to index 0)
```

### 🔍 Modulo Pointer Update Rules
- `rear = (rear + 1) % MAX_SIZE`
- `front = (front + 1) % MAX_SIZE`

---

## 3. Advanced Queue Structures

1. **Deque (Double-Ended Queue)**: Elements can be inserted or deleted from **both** the Front and the Rear.
2. **Priority Queue**: Each element has a priority weight value. Elements with higher priority are dequeued before lower priority ones, regardless of insertion order.

🌐 **Real Use Case**:
- **CPU Task Scheduling**: Operating systems queue processes waiting for execution.
- **Print Spooling**: When multiple documents are sent to a single network printer, they print in the order they arrived using a FIFO print queue.
- **Router Buffers**: Packets travelling across internet routers are queued in memory buffers to manage network traffic spikes.
