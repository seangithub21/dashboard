import { forwardRef } from "react";
import MaterialTable from "material-table";
import {
  ArrowDownwardOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  ClearAll,
  FilterListOff,
  FirstPageOutlined,
  LastPageOutlined,
  Search,
} from "@mui/icons-material";

const icons = {
  Filter: forwardRef((props, ref) => <FilterListOff {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => (
    <FirstPageOutlined {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPageOutlined {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRightOutlined {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeftOutlined {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <ClearAll {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownwardOutlined {...props} ref={ref} />
  )),
};

const Table = (props) => {
  return (
    <MaterialTable
      {...props}
      icons={icons}
      style={{ borderRadius: ".8rem .8rem 0 0" }}
    >
      Table
    </MaterialTable>
  );
};

export default Table;
