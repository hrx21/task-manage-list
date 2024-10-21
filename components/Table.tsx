// reusableTable.tsx
import React, { useState } from 'react';
import styles from '@/styles/table.module.scss';

// Define the base properties that all items must have
interface BaseItem {
    id: string | number;
    [key: string]: any;
}

interface TableProps<T extends BaseItem> {
    data: T[];
    columns: {
        header: string;
        field: keyof T | string;
        render?: (item: T) => React.ReactNode;
    }[];
    pageSize?: number;
    showPagination?: boolean;
    onRowClick?: (item: T) => void;
    renderActions?: (item: T, index: number) => React.ReactNode;
    sortable?: boolean;
    loading?: boolean;
    emptyMessage?: string;
}

const ReusableTable = <T extends BaseItem>({
    data,
    columns,
    pageSize = 10,
    showPagination = true,
    onRowClick,
    renderActions,
    sortable = true,
    loading = false,
    emptyMessage = "No data available"
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<keyof T | string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Calculate pagination
    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Handle sorting
    const sortedData = React.useMemo(() => {
        if (!sortField) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortField as keyof T];
            const bValue = b[sortField as keyof T];

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortField, sortDirection]);

    const displayedData = showPagination
        ? sortedData.slice(startIndex, endIndex)
        : sortedData;

    const handleSort = (field: keyof T | string) => {
        if (!sortable) return;

        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const renderSortIcon = (field: keyof T | string) => {
        if (!sortable) return null;

        if (sortField !== field) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    return (
        <div className={styles.tableContainer}>
            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        onClick={() => handleSort(column.field)}
                                        className={sortable ? styles.sortableHeader : ''}
                                    >
                                        {column.header}
                                        {renderSortIcon(column.field)}
                                    </th>
                                ))}
                                {renderActions && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (renderActions ? 1 : 0)}
                                        className={styles.emptyMessage}
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                displayedData.map((item, rowIndex) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => onRowClick?.(item)}
                                        className={onRowClick ? styles.clickableRow : ''}
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td key={`${item.id}-${colIndex}`}>
                                                {column.render
                                                    ? column.render(item)
                                                    : item[column.field as keyof T]}
                                            </td>
                                        ))}
                                        {renderActions && (
                                            <td>{renderActions(item, rowIndex)}</td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {showPagination && totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={styles.paginationButton}
                            >
                                Previous
                            </button>
                            <span className={styles.pageInfo}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={styles.paginationButton}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ReusableTable;