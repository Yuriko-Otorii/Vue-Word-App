import gql from 'graphql-tag';

export const getMemoryCardQuery = gql`
  query{
    getWordTestByMemoryProcess{
      word{
        id
        word
        category {
          id
          name
        }
        nextMemoryTestDate
        pronunciation
        partsOfSpeech
        image
        example
        memoryProcess
        testCount
        isFavorite
        user {
          id
          username
        }
      }
      definitionChoices {
        definition
        isCorrect
      }          
    }
  } 
`
