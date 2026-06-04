# Module 8: Recursion & Backtracking

Recursion is a programming technique where a function solves a problem by calling a smaller instance of itself.

---

## 1. The Anatomy of Recursion

Every recursive function must have two components:
1. **Base Case**: The termination condition. When this condition is met, the function stops calling itself and returns a value.
2. **Recursive Step**: The self-call that reduces the problem space towards the Base Case.

```c
int factorial(int n) {
    if (n <= 1) return 1;          // Base Case
    return n * factorial(n - 1);   // Recursive Step
}
```

⚠️ **Caution (Stack Overflow)**: If you write a recursive function without a base case, or if the base case is never reached, the function calls itself infinitely. This fills the system's **Call Stack** and crashes with a **Stack Overflow** error.

---

## 2. Head vs. Tail Recursion

- **Head Recursion**: The recursive call occurs at the **beginning** of the function, before any computations are performed.
- **Tail Recursion**: The recursive call is the **final operation** in the function.
  *Why it matters*: Modern compilers can optimize tail-recursive functions into simple loops under the hood, reusing a single stack frame to save memory.

---

## 3. Backtracking: Trial and Error

### ❓ What is Backtracking?
An algorithm design pattern that builds candidate solutions incrementally. If the path leads to a dead end (violates constraints), the algorithm **backtracks** (undoes the last step) and tries the next path.

```
                  [Start]
                  /     \
               [Path A] [Path B]
                 /         \
            [Dead End]    [Success! 🏆]
            (Backtrack!)
```

🧠 **Real-World Analogy**: Solving a **Maze**. You walk forward until you hit a wall. You then walk backward to the last intersection point (backtrack) and try the alternative direction.
