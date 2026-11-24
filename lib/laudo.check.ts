// Checagem do parser do tradutor de laudo: node --experimental-strip-types lib/laudo.check.ts
import assert from "node:assert/strict"
// @ts-expect-error -- node roda .ts direto (strip-types) e exige a extensão
import { EXAMPLE, translate } from "./laudo.ts"

const ex = translate(EXAMPLE)
assert.deepEqual(ex.list.map((f) => f.finding.id), ["pro", "aba", "comp", "ost", "des", "ret"])
assert.deepEqual(ex.roots, ["L5"]) // "tocando a raiz de L5"
assert.deepEqual(ex.nerveLevels, ["L4-L5"])
assert.equal(ex.side, "left")
assert.equal(ex.good, false)

// negação: "sem compressão" não vira achado e conta como boa notícia
const neg = translate("Sem sinais de compressão radicular. Abaulamento discal em L5-S1.")
assert.deepEqual(neg.list.map((f) => f.finding.id), ["aba"])
assert.equal(neg.good, true)

// hérnia genérica some quando há tipo específico; foraminal pega a raiz do próprio nível
const her = translate("Hérnia discal extrusa foraminal direita em L4-L5.")
assert.deepEqual(her.list.map((f) => f.finding.id), ["ext"])
assert.deepEqual(her.roots, ["L4"])
assert.equal(her.side, "right")

assert.equal(translate("texto qualquer").list.length, 0)
console.log("laudo.check ok")
