var config = module.exports = {
  url: 'https://api.producthunt.com/v1/docs/',
  host: 'api.producthunt.com',
  basePath: '/v1',
  title: 'Product Hunt API',
  description: {selector: ''},
  operation: {selector: '.api--content'},
  path: {selector: '.api--request pre:first-of-type', regex: /\w+ (.*)/},
  fixPathParameters: function(path) {
    var pieces = path.split('/');
    var params = [];
    pieces.forEach(function(piece) {
      var match = piece.match(/^(\d+)$/) || piece.match(/l33thaxor/);
      if (match)  {
        path = path.replace('/' + match[0], '/{id}');
        return;
      }
      if (piece === 'games' || piece === 'tech' || piece === 'books' || piece === 'podcasts') {
        path = path.replace(piece, '{category}');
      }
    })
    return path;
  },
  method: {selector: '.api--request pre:first-of-type', regex: /(\w+) .*/},
  parameters: {selector: 'table'},
  parameter: {selector: 'tr'},
  parameterName: {selector: 'td:first-of-type', regex: /(\w+)( required)?/},
  parameterDescription: {selector: 'td:nth-of-type(2)'},
  requestBody: {selector: 'h3:nth-of-type(1) + h4 + pre + h4 + pre + h4 + pre', isExample: true},
  responseStatus: {selector: 'h3:nth-of-type(2) + h4 + pre', regex: /(\d+) .*/},
  responseDescription: {selector: 'h3:nth-of-type(2) + h4 + pre', regex: /\d+ (.*)/},
  responseSchema: {selector: 'h3:nth-of-type(2) + h4 + pre + h4 + pre + h4 + pre', isExample: true},

  defaultParameterLocations: {
    put: 'field',
    post: 'field',
    patch: 'field',
  },
}
