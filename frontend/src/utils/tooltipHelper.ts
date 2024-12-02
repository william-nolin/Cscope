// src/utils/tooltipHelper.ts
import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";
import dayjs from "dayjs";

export function getModificationTypeFromColor(color: string): string {
  switch (color) {
    case TypeFileCommitEvolution.ADD_FILE:
      return "Added file";
    case TypeFileCommitEvolution.SET_FILE:
      return "Updated file";
    case TypeFileCommitEvolution.DELETE_FILE:
      return "Deleted file";
    default:
      return "Unknown Modification";
  }
}

export function filterByDate(
  date: string,
  startDate: string,
  endDate: string
): boolean {
  const itemDate = dayjs(date);

  return (
    (!startDate ||
      itemDate.isSame(dayjs(startDate), "day") ||
      itemDate.isAfter(dayjs(startDate), "day")) &&
    (!endDate ||
      itemDate.isSame(dayjs(endDate), "day") ||
      itemDate.isBefore(dayjs(endDate), "day"))
  );
}

export function getFileName(filepath: string): string {
  // Split the URL by '/'
  const parts = filepath.split("/");

  // Return the last non-empty element
  return parts.filter((part) => part.trim() !== "").pop() || "";
}

export function getFileExtension(filepath: string): string {
  // Split the URL by '/'
  const parts = filepath.split(".");

  // Return the last non-empty element
  return parts.filter((part) => part.trim() !== "").pop() || "";
}
