module.exports = class challenge  {
    challengeId;
    userId;
    tittle;
    description;
    followers;
    startDate;
    endDate;
    days;
    timestamp;

   
    
    constructor(
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days,
    timestamp,
    ) {
      this.challengeId = challengeId;
      this.userId = userId;
      this.tittle = tittle;
      this.description = description;
      this.followers = followers;
      this.startDate = startDate;
      this.endDate = endDate;
      this.days = days;
      this.timestamp = timestamp;
    }
    
    get challengeId() {
      return this.challengeId;
    }
    
    set challengeId(challengeId) {
      this.challengeId = challengeId;
    }
  
    get userId () {
      return this.userId ;
    }
    
    set userId (userId ) {
      this.userId  = userId ;
    }
  
    get tittle() {
      return this.tittle;
    }
    
    set tittle(tittle) {
      this.title =tittle;
    }
    
    get description() {
        return this.description;
      }
      
      set description(description) {
        this.description =description;
      }

      get followers() {
        return this.followers;
      }
      
      set followers(followers) {
        this.followers =followers;
      }  

      get startDate() {
        return this.startDate;
      }
      
      set startDate(startDate) {
        this.startDate =startDate;
      } 

      get endDate() {
        return this.endDate;
      }
      
      set endDate(endDate) {
        this.endDate =endDate;
      } 

      get endDate() {
        return this.endDate;
      }
      
      set endDate(endDate) {
        this.endDate =endDate;
      } 

      get days() {
        return this.days;
      }
      
      set days(days) {
        this.days =days;
      }
      
      get timestamp() {
        return this.timestamp;
      }
      
      set timestamp(timestamp) {
        this.timestamp =timestamp;
      } 


    
  };