# Why not using `as const satisfies` is hurting you

## Video



## Takeaways

- Use `as const satisfies Type` by default. Type checking + immutability.
- Use just `satisfies Type` in case you need to add new keys and can't have an immutable object.
	- You can still use `as const` for specific properties that you want to be immutable!
- If you keep running into type errors, use `: Type`.
- Only in very specific and rare cases, use `as Type`.
- And NEVER use `as unknown as Type` or `as any`. These are instant red flags, and mean the code needs refactoring.

| Approach                  | Validates | Preserves Literals | Readonly | Safe |
| ------------------------- | --------- | ------------------ | -------- | ---- |
| `: Type`                  | ✅         | ❌                  | ❌        | ⚠️    |
| `as Type`                 | ❌         | ❌                  | ❌        | ❌    |
| `as const`                | ❌         | ✅                  | ✅        | ⚠️    |
| `satisfies Type`          | ✅         | ⚠️                  | ❌        | ✅    |
| `as const satisfies Type` | ✅         | ✅                  | ✅        | ✅    |