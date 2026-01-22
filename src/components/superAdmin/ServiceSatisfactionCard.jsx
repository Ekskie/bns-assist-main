"use client";
import { Star } from "lucide-react";
import { useGetFeedBackQuery } from "@/service/feedback/feedbackApiSlice";

export default function ServiceSatisfactionCard() {
  const { data, isLoading } = useGetFeedBackQuery();

  if (isLoading) return <div>Loading...</div>;

  const feedbacks = data || [];
  console.log(feedbacks);
  // Calculate average rating
  const totalRatings = feedbacks.length;
  const averageRating =
    totalRatings > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rate, 0) / totalRatings).toFixed(
          1
        )
      : 0;

  // Calculate star breakdown
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  feedbacks.forEach((f) => {
    const rounded = Math.round(f.rate); // e.g., 4.6 → 5
    if (counts[rounded] !== undefined) counts[rounded]++;
  });

  const ratings = Object.keys(counts)
    .reverse()
    .map((star) => {
      const count = counts[star];
      return {
        stars: Number(star),
        count,
        percent:
          totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0,
      };
    });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-sm border border-gray-100">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900">
        Service Satisfaction
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Based on {totalRatings} parent feedback ratings
      </p>

      {/* Average Rating */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 flex justify-center items-center gap-1">
          {averageRating}{" "}
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </div>
        <p className="text-sm text-gray-500">Average rating</p>
      </div>

      {/* Bar breakdown */}
      <div className="space-y-2 mb-6">
        {ratings.map(({ stars, percent, count }) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-5 text-sm text-gray-700 flex items-center gap-0.5">
              {stars}{" "}
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-sm text-gray-700 w-16 text-right">
              {percent}% ({count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
