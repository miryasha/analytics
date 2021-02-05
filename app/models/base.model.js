class Base {
      constructor(connection){
          this.connection = connection;
      }

      query(query, args = []){
          
          return new Promise((resolve, reject) => {
              this.connection.query(query, args, function(err, data){
                  if(err){ return reject(err); }
                  else {
                      return resolve(data);
                  }
              })
          });
      }
  }
  module.exports = Base;