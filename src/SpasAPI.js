const clientId = 'KPZ3V0JC3QQFIBO4CKSZJO1I1KGIWTQ3EPFSM25DPJRA2FEO';
const clientSecret = '0IGCH52OQPJJLW1SQXRKUL4LDEWZ3TRZRD0IHWQLMB03YRIK';
const api = 'https://api.foursquare.com/v2/venues';

export const getAll = () =>
  fetch(`${api}/explore?near=LA&query=spa&client_id=${clientId}&client_secret=${clientSecret}&v=20190413`)
  .then(res => res.json())
  .then(spa => spa.response.groups[0].items);
