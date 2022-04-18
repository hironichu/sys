# SYS

> This module was made in 10 minutes.

Get all your system information typed in one variable.

This is a Work in progress, anything can break at anytime, feel free to open an
issue.

Usage

```ts
import { system } from "https://deno.land/x/sys/mod.ts";

console.log(system.users);
//
// [
//   {
//     name: "_mbsetupuser",
//     groups: [...],
//     uid: "248",
//     gid: "248"
//   },
//   {
//     name: "ekko",
//     groups: [...]
//  ...
```

You can also get some temperator out of your components

> ## ⚠️ This Requires admin rights. (Run with sudo) ⚠️

```ts
import { system } from "https://deno.land/x/sys/mod.ts";

console.log(system.components);
// [
//   { label: "PECI CPU", critial_temp: 0, max_temp: 0, temp: 47.96875 },
//   { label: "CPU Proximity", critial_temp: 0, max_temp: 0, temp: 42.1875 },
//   { label: "Battery", critial_temp: 0, max_temp: 0, temp: 33.6875 }
// ]
```
