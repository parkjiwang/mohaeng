import { EVENTS } from "@/lib/mockEvents";

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const events = EVENTS.filter((e) => e.region === slug);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">{slug} 지역 행사</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">등록된 행사가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="border rounded-lg p-4 hover:bg-gray-50">
              {e.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
