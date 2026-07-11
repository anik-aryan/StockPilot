import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back to StockPilot"
        action={<Button>Add Product</Button>}
      />

      <Card>
        Dashboard is working 🚀
      </Card>
    </>
  );
}