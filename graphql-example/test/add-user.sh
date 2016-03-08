#
# add-user.sh
# Add 2 users
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/json' -H 'Accept: text/plain' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d "'
    mutation {
        addUser (userid:\"4\", name:\"Mary Lamb\", age:25) {
            userid name age
        }
    }
'"

curl -H 'Content-Type: application/json' -H 'Accept: text/plain' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d "'
    mutation {
        addUser (userid:\"2\", name:\"John Doe\", age:29) { 
            userid name age
        }
    }
'"
