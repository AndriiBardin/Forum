import { TableFooter } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Divider from '@material-ui/core/Divider';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <TableFooter>
      <div className="pagination">
        <TableRow>
          <>
            {pageNumbers.map((number) => (
              <button key={number} className="page-item">
                <a onClick={() => paginate(number)}>{number}</a>
              </button>
            ))}
          </>
        </TableRow>
      </div>
    </TableFooter>
  );
};

export default Pagination;
