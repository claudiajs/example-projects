#
# get-a-user.sh
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d '{
  user (userid:"4") {
     userid
     name
     age
  }
}'
