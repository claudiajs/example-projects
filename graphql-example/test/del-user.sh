#
# del_user.sh
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/json' -H 'Accept: text/plain' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d "'
    mutation { 
        deleteUser (userid:\"4\") { 
            userid name age 
        } 
    }
'"
