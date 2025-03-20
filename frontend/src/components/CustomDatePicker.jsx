import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function CustomDatePicker({ selectedDate, setSelectedDate }) {
  const { t } = useTranslation();

  // selectedDate가 string이면 Date 객체로 변환
  const validDate =
    selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

  return (
    <div className="mt-2 flex items-center justify-between w-64 relative overflow-visible">
      <span className="text-sm font-semibold">{t("eventDate")}</span>
      <div className="absolute right-0">
        <DatePicker
          selected={validDate} // 수정된 부분
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border shadow rounded-md w-24 py-1.5 text-gray-700 text-center text-sm font-semibold"
          popperProps={{
            modifiers: [
              { name: "preventOverflow", options: { boundary: "viewport" } },
              {
                name: "flip",
                options: { fallbackPlacements: ["top", "bottom"] },
              },
            ],
          }}
          popperPlacement="bottom-end"
        />
      </div>
    </div>
  );
}

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};
