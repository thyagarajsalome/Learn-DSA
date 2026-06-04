# Module 4: Strings & Pattern Matching

A String is a special character array used to store text. In C, strings have specific characteristics that differ from standard numerical arrays.

---

## 1. Character Arrays & The Null Terminator (`\0`)

### ❓ What is the Null Terminator?
In C, a string is a character array that **must** end with a special null character `\0` (ASCII value `0`).

### 💡 Why do we need it?
An array does not automatically know its own size. The string functions (like `printf` or `strlen`) read character-by-character until they hit `\0`, which marks the end of the text.

```c
char name[] = "DSA"; 
// Memory footprint: ['D', 'S', 'A', '\0'] (4 bytes allocated)
```

⚠️ **Caution**: If you manually initialize a character array and forget to append `\0`, string functions will keep reading memory past your array, printing garbage text until they eventually trigger a **Segmentation Fault** crash.

---

## 2. Fundamental Operations

### 🔹 String Length (`strlen`)
Walks down the array counting characters until reaching `\0`. Runs in $O(N)$ time.

### 🔹 Reverse String
Swaps character pointers from both ends moving towards the middle:
```c
void reverse(char str[]) {
    int i = 0;
    int j = strlen(str) - 1;
    while (i < j) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++; j--;
    }
}
```

---

## 3. Pattern Matching (Substring Search)

### ❓ What is Pattern Matching?
Finding whether a short string (Pattern) exists inside a larger string (Text).

### 🔍 Brute-Force Substring Search
Align the pattern at the start of the text. Compare characters. If mismatch, shift pattern right by 1 index and repeat. Runs in $O(N 	imes M)$ time.

```
Text:    [ A  B  C  D  E ]
Pattern: [ C  D ]
1. Compare Pattern at index 0: A vs C (mismatch, shift)
2. Compare Pattern at index 1: B vs C (mismatch, shift)
3. Compare Pattern at index 2: C vs C (match!), D vs D (match! - found pattern at index 2)
```

🌐 **Real Use Case**: Substring search powers **Ctrl + F** search shortcuts, word processing spell checkers, and DNA sequence matching engines.
