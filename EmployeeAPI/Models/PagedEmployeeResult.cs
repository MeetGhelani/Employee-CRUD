namespace EmployeeAPI.Models
{                   
    public class PagedEmployeeResult
    {
        public List<Employee> Employees
        {
            get;
            set;
        } = [];

        public int TotalCount
        {
            get;
            set;
        }
    }

}