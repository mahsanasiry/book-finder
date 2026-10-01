export type SortOption = "relevance" | "title-asc" | "title-desc";

type Props = {
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  coverOnly: boolean;
  onCoverOnlyChange: (value: boolean) => void;
};

export default function ResultControls({
  sort,
  onSortChange,
  coverOnly,
  onCoverOnlyChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
      <label className="flex items-center gap-2 text-sm">
        Sort by
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-gray-300 bg-white p-2"
        >
          <option value="relevance">Relevance</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={coverOnly}
          onChange={(e) => onCoverOnlyChange(e.target.checked)}
        />
        Only books with a cover
      </label>
    </div>
  );
}