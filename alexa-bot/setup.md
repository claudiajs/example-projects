Here are the parameters you should set up with your Alexa skill

# Intent Schema

```
{
  "intents": [{
    "intent": "GetSpelling",
    "slots": [
     {
       "name": "Words",
       "type": "LIST_OF_WORDS"
     }]
  }]
}
```

# Slot types

* Type: `LIST_OF_WORD`

Examples: 

```
good morning
line
tea
promises
my phone number is 12345
```

# Sample Utterances

GetSpelling give me the spelling for {Words}
GetSpelling how do you spell {Words}
GetSpelling what is the spelling for {Words}
GetSpelling spell {Words}

