// app/checkout/page.tsx  (or wherever you want to use it)
export default function CheckoutPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", height: "100vh" }}>
      <iframe
        src="/api/paytomorrow"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="PayTomorrow Financing"
      />
    </div>
  );
}
