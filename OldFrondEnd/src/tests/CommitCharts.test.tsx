import { render } from '@testing-library/react';
import CommitCharts from '../components/recharts/CommitCharts';
import '@testing-library/jest-dom';
import { ChangeType } from '../interface';


global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

const mockData = [
  {
    hash: 'abc123',
    timestamp: 1625152800000,
    committer_date: new Date('2021-07-01T12:00:00Z'),
    files: [
      {
        path: 'file1.txt',
        type: 'source',
        added_lines: 10,
        deleted_lines: 2,
        change_type: ChangeType.MODIFY,
      },
      {
        path: 'file2.txt',
        type: 'test',
        added_lines: 5,
        deleted_lines: 3,
        change_type: ChangeType.ADD,
      },
    ],
  },
  {
    hash: 'def456',
    timestamp: 1625239200000,
    committer_date: new Date('2021-07-02T12:00:00Z'),
    files: [
      {
        path: 'file1.txt',
        type: 'source',
        added_lines: 7,
        deleted_lines: 1,
        change_type: ChangeType.MODIFY,
      },
    ],
  },
];

const mockOpenFileInNewTab = (_path: string, _commit: string) => {}

describe('CommitCharts Component', () => {
  test('renders without crashing', () => {
    render(<CommitCharts data={mockData} cellClickHandler={mockOpenFileInNewTab} />);
    const chartElement = document.querySelector('.recharts-responsive-container');
    expect(chartElement).toBeInTheDocument();
  });
});