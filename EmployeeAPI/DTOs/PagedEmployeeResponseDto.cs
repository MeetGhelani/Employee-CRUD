namespace EmployeeAPI.DTOs
{
    public class PagedEmployeeResponseDto
    {
        public IEnumerable<EmployeeDto> Employees
        {
            get;
            set;
        } = new List<EmployeeDto>();

        public int TotalCount
        {
            get;
            set;
        }

        public int Page
        {
            get;
            set;
        }

        public int PageSize
        {
            get;
            set;
        }
    }
}
