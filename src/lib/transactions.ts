import { supabase } from "@/lib/supabase/server";

type TransactionInput = {
  transaction_id: string;
  stripe_transaction_id: string;
  status: "pending" | "paid" | "failed";
  download_expiry: string;
  created_at: string;
};

export async function saveTransaction(data: TransactionInput) {
  const { error } = await supabase
    .from("transactions")
    .insert([data]);

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error("Failed to save transaction");
  }
}
