module.exports = class routine {
    routineId;
    userId;
    tittle;
    privacy;
    description;
    exerciseInfo;
    timestamp;
   
    
    constructor(
        routineId = undefined,
        userId = undefined,
        tittle,
        privacy,
        description,
        exerciseInfo,
        timestamp,
      ) 
      {
      this.routineId = routineId;
      this.userId = userId;
      this.tittle = tittle;
      this.privacy = privacy;
      this.description = description,
      this.exercisesInfo= exercisesInfo;
      this.timestamp = timestamp;
    }
    
    get routineId() {
      return this.routineId;
    }
    
    set routineId(routineId) {
      this.routineId= routineId;
    }

    get userId() {
      return this.userId;
    }
    
    set userId(userId) {
      this.userId = userId;
    }
  
    get title () {
      return this.title ;
    }
    
    set tittle (tittle ) {
      this.tittle = tittle ;
    }
  
    
    get privacy() {
      return this.privacy;
    }
    
    set privacy(privacy) {
      this.privacy = privacy;
    }
    
    get description() {
      return this.description;
    }
    
    set description(description) {
      this.description = description;
    }
  
    get exerciseInfo() {
      return this. exerciseInfo;
    }
    
    set  exerciseInfo(exerciseInfo) {
      this.exerciseInfo =  exerciseInfo;
    }
  
    
    get timestamp () {
      return this.timestamp;
    }
    
    set timestamp (timestamp) {
      this.timestamp = this.timestamp;
 


  };
}