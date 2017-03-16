/**
 * System permission control
 */
var config = require('../../config/config');
var node_acl = require('acl');
var acl;

var client = require('redis').createClient(config.redis.port, config.redis.host, {no_ready_check: true});

var redisBackend = new node_acl.redisBackend(client);

acl = new node_acl(redisBackend);

set_roles(acl);

module.exports = {
  acl: acl,
  maybePass: maybePass
}


function set_roles(acl) {

    //Define roles, resources e permissoes
    acl.allow([
        {
            roles: 'admin',
            allows: [
                //{ resources: '/secret', permissions: 'create' },
                //{ resources: '/topsecret', permissions: '*' }
            ]
        }, {
            roles: 'user',
            allows: [
                //{ resources: '/secret', permissions: 'get' }
            ]
        }, {
            roles: 'guest',
            allows: [
              //Perceba que register eh post, logo o guest nunca ira poder se registrar
              //mas se mudarmos para post ele conseguera
              { resources: '/usuario/registrar', permissions: 'post'}
              //{ resources: '/home', permissions: 'get'}
            ]
        }
    ]);

    // Herança de roles
    //  Eh permitido a todo usuario fazer o que um guest faz
    //  Todo admin pode fazer o que um usuario faz
    acl.addRoleParents( 'user', 'guest' );
    acl.addRoleParents( 'admin', 'user' );

    //GUESTID eh um token generico para os guests, no caso usuarios nao logados
    //Temos que adicionar essa funcao addUserRoles toda vez que um novo usuario eh criado
    //No caso inserir o token do usuario na sua role especifica
    acl.addUserRoles('GUESTID', 'guest');
}



function maybePass(req, res, next){
    //Se existe um token, ha um usuario logado, caso nao ele eh guest
    var usuarioId = req.decoded ? req.decoded._id : 'GUESTID';

    //Verifica no redis se aquele token, pode acessar aquela rota
    acl.isAllowed(usuarioId, req.route.path, req.method.toLowerCase(), function(err, allowed) {
      console.log(allowed);
      if (allowed) {
        return next();
      }
      res.status(403).json({
        error: 'Você não tem as permissões suficientes para realizar essa ação.'
      });
    });

}
