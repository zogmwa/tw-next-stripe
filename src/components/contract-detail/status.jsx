export const contractStatus = (is_metered) => {
  return is_metered ? [
    {
      name: 'active',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'canceled',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'incomplete',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'incomplete_expired',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'past_due',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'trialing',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'unpaid',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
  ] : [
    {
      name: 'Pending',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'In Progress',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'In Review',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'Completed',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
  ]
}

export const makeTitle = (slug) => {
  return slug.split("_").join(" ").replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  });
}
