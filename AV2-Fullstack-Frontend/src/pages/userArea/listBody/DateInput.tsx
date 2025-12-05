import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  year: string;
  month: string;
  day: string;
  setYear: (year: string) => void;
  setMonth: (month: string) => void;
  setDay: (day: string) => void;
}

function getDateObj(year: string, month: string, day: string) {
  if (year && month && day) {
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return null;
}

const DateInput: React.FC<DateInputProps> = ({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
}) => {
  function handleDateChange(dateObj: Date | null) {
    if (dateObj) {
      setYear(String(dateObj.getFullYear()));
      setMonth(String(dateObj.getMonth() + 1).padStart(2, "0"));
      setDay(String(dateObj.getDate()).padStart(2, "0"));
    } else {
      setYear("");
      setMonth("");
      setDay("");
    }
  }

  return (
    <label className="date-input">
      Date:
      <div className="date-picker">
        <DatePicker
          selected={getDateObj(year, month, day)}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select date"
          required
          className="date-picker-input"
          calendarClassName="date-picker-calendar"
          popperPlacement="bottom-start"
          popperClassName="custom-datepicker-popper"
        />
      </div>
    </label>
  );
};

export default DateInput;
