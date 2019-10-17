class ApplicationController < ActionController::API

    def current_user
        id = decode_token['id']
        User.find_by(id: id)
      end

    def decode_token
      begin  
        JWT.decode(token, secret).first
      rescue 
        {} # //if it breaks the function will return empty object... if it doesnt it will return whatever is above.. 
      end 
    end 

    def token
        request.headers['Authorisation']
    end 

    def secret
        'shush'
    end 

    def issue_token(data)
        JWT.encode(data, secret)
    end 
end
