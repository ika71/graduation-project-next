import Link from "next/link";

interface Props {
  url: string;
  currentPage: number;
  totalCount: number;
  size: number;
}

const PaginationComponent: React.FC<Props> = (props) => {
  const url = props.url; //페이징 할 url
  const currentPage = props.currentPage; //현재 페이지
  const totalCount = props.totalCount; //모든 게시글들의 수
  const size = props.size; //한번에 보여줄 게시글의 수

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
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={`${url}${pages[0] - 1 > 0 ? pages[0] - 1 : 1}`}
            >
              &laquo;
            </Link>
          </li>

          {pages.map((p: number) => (
            <li key={p} className="page-item">
              <Link
                className={
                  p == currentPage
                    ? "page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                    : "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                }
                href={`${url}${p}`}
              >
                {p}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
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
      </nav>
    </div>
  );
};

export default PaginationComponent;
