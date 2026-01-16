// lib/transactions.ts
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "transactions.json");

export function saveTransaction(tx: any) {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  data.push(tx);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
