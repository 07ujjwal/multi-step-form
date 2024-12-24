let mockFormData = {
  name: "ujjwal singh",
  email: "ujjwalbit45@gmail.com",
  address: "123 Main St",
  city: "Ranchi",
  subscribe: true,
  review: "Great experience!",
};

export async function GET() {
  return new Response(
    JSON.stringify({
      message: "Form data fetched successfully",
      data: mockFormData,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req) {
  const newFormData = await req.json();
  mockFormData = { ...mockFormData, ...newFormData };

  return new Response(
    JSON.stringify({
      message: "Form data updated successfully",
      data: mockFormData,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
