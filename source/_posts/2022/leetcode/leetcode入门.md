---
title: leetcode入门
category: leetcode
date: 2022-09-24 11:08:15
tags:
---

# leetcode



## 动态规划

* **节约空间**

动态规划经常用到一个记录状态的数组，若始终只用到当前值和前一个值的话，只需使用一个变量存下前一个值即可。无需使用数组存一些以后不会用到的值。



## 结尾检查

#### [2414. 最长的字母序连续子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-alphabetical-continuous-substring/)

```python
class Solution:
    def longestContinuousSubstring(self, s: str) -> int:
        max_len = 1
        pre = s[0]
        cnt = 1
        for ch in s[1::]:
            if ord(ch) - ord(pre) == 1:
                cnt += 1
            else:
                max_len = max(max_len,cnt)
                cnt = 1
            pre = ch
        # 容易遗漏
        max_len = max(max_len,cnt)
        return max_len
```

最后在循环外的 `max_len = max(max_len,cnt)` 检查，很容易遗漏。

在for循环中的检查不会遗漏，但是若恰好在循坏的最后一个阶段得到了最后解，此时循环结束，没有下一个循环状态来更新，所以造成漏解。故若循环有状态更新，一定留意循环结束时的状态是否需要更新。
