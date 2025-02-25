export interface Paginated<T> {
    data: T[];
    page: number;
    size: number;
    totalPages: number;
}
