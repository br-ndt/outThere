const getDate = (data) => {
  const DATEOPTIONS = { dateStyle: "full", timeStyle: "short" };
  const DATE = new Date(data * 1000);
  return new Intl.DateTimeFormat("en-US", DATEOPTIONS).format(DATE);
}

export default getDate;