module.exports = {
    sum: (a, b) => a + b,
    sortCourses: (field, _Sort) => {
        var _SortType = field === _Sort.column ? _Sort.type : "default";
        const icons = {
            default: 'bi bi-chevron-expand',
            desc: "bi bi-sort-down",
            asc: "bi bi-sort-up"
        }
        const types = {
            asc: `?_Sort&column=${field}&type=desc`,
            default: `?_Sort&column=${field}&type=asc`,
            desc: "?",
        }; 
        const href = `${types[_SortType]}`;
        return `
                    <a href="${href}">
                        <i class="${icons[_SortType]}"></i>
                    </a>
                `;  
    },
};