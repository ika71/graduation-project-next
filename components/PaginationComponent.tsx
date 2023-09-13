import Link from "next/link";

interface Props {
  url: string;
  currentPage: number;
  totalCount: number;
  size: number;
}
/**
 *
 * @param url 페이징 할 url("url페이지번호" 형식으로 페이징됨)
 * @param currentPage 현재 페이지
 * @param totalCount 모든 원소들의 수
 * @param size 한 페이지에 보여줄 원소의 수
 * @returns
 */
const PaginationComponent = (props: Props) => {
  const { url, currentPage, totalCount, size } = props;

  const totalPageCount = Math.ceil(totalCount / size); //총 페이지의 수
  const showPageNumber = 5; //보여줄 페이지 칸의 수
  const start = //페이지 칸의 첫번째 칸 번호
    1 + Math.floor((currentPage - 1) / showPageNumber) * showPageNumber;
  const pages: number[] = []; //보여줄 페이지 칸 리스트

  for (let i = start; i < start + showPageNumber; i++) {
    if (i > totalPageCount) {
      break;
    }
    pages.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex list-style-none">
        <li>
          <Link
            className="relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={`${url}${pages[0] - 1 > 0 ? pages[0] - 1 : 1}`}
          >
            &laquo;
          </Link>
        </li>

        {pages.map((p: number) => (
          <li key={p}>
            <Link
              className={
                "relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 " +
                (p == currentPage
                  ? "bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                  : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none")
              }
              href={`${url}${p}`}
            >
              {p}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className="relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={`${url}${
              pages[pages.length - 1] + 1 <= totalPageCount
                ? pages[pages.length - 1] + 1
                : pages[pages.length - 1] || 1
            }`}
          >
            &raquo;
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PaginationComponent;
