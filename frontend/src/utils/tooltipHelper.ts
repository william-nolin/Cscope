// src/utils/tooltipHelper.ts
import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";

export function getModificationTypeFromColor(color: string): string {
  switch (color) {
    case TypeFileCommitEvolution.ADD_SOURCE_FILE:
      return "Added source file";
    case TypeFileCommitEvolution.SET_SOURCE_FILE:
      return "Updated source file";
    case TypeFileCommitEvolution.DELETE_SOURCE_FILE:
      return "Deleted source file";
    case TypeFileCommitEvolution.ADD_TEST_FILE:
      return "Added test file";
    case TypeFileCommitEvolution.SET_TEST_FILE:
      return "Updated test file";
    case TypeFileCommitEvolution.DELETE_TEST_FILE:
      return "Deleted test file";
    case TypeFileCommitEvolution.ADD_DOC_FILE:
      return "Added documentation file";
    case TypeFileCommitEvolution.SET_DOC_FILE:
      return "Updated documentation file";
    case TypeFileCommitEvolution.DELETE_DOC_FILE:
      return "Deleted documentation file";
    default:
      return "Unknown Modification";
  }
}
