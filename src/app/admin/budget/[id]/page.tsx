import { AddExpenseButton } from "@/components/expenses/AddExpenseButton";
import { ModalContainer } from "@/components/ui/ModalContainer";
import { getBudget } from "@/services/budgets";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const budget = await getBudget(id);

  return {
    title: `${budget.name} - CashTrackr`,
    description: `${budget.name}`,
  }
}
export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const budget = await getBudget(id);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
        </div>
        <AddExpenseButton />
      </div>
      <ModalContainer />
    </>
  );
}
