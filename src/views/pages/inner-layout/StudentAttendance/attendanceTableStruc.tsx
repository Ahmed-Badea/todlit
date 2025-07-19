import { IColumn } from "../../../../design-system/types/Table/index";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const columns: IColumn[] = [
  {
    title_en: "Name",
    title_ar: "الاسم",
    value: "first_name",
    dataType: "name",
  },
  {
    title_en: "Class",
    title_ar: "الصف",
    value: "class_name",
    dataType: "string",
  },
  {
    title_en: "Check In",
    title_ar: "الحضور",
    value: "check_in_details",
    dataType: "multi_field",
    fields: [
      { key: "time", label: "", format: "time" },
      { key: "name", label: "By" },
      { key: "temperature", label: "" },
    ],
  },
  {
    title_en: "Check Out",
    title_ar: "الانصراف",
    value: "check_out_details",
    dataType: "multi_field",
    fields: [
      { key: "time", label: "", format: "time" },
      { key: "name", label: "By" },
      { key: "temperature", label: "" },
    ],
  },
  {
    title_en: "",
    title_ar: "",
    value: "actions",
    dataType: "actions",
    buttons: [
      {
        label: "Check In",
        action: "check_in",
        color: "primary",
        leadingIcon: <FontAwesomeIcon icon={faSignInAlt} />,
      },
      {
        label: "Check Out",
        action: "check_out",
        color: "primary",
        leadingIcon: <FontAwesomeIcon icon={faSignOutAlt} />,
      },
    ],
  },
];

export default columns;
