module.exports = class record {
    recordId;
    userId;
    tittle;
    description;
    recordTable
    timestamp;
   
    
    constructor(
        recordId = undefined,
        userId = undefined,
        tittle,
        privacy,
        description,
        recordTable,
        timestamp,
      ) 
      {
      this.recordId = recordId;
      this.userId = userId;
      this.tittle = tittle;
      this.privacy = privacy;
      this.description = description,
      this.recordTable= recordTable;
      this.timestamp = timestamp;
    }
    
    get recordId() {
      return this.recordId;
    }
    
    set recordId(recordId) {
      this.recordId= recordId;
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
  
    get recordTable() {
      return this. recordTable;
    }
    
    set  recordTable(recordTable) {
      this.recordTable = recordTable;
    }
  
    
    get timestamp () {
      return this.timestamp;
    }
    
    set timestamp (timestamp) {
      this.timestamp = this.timestamp;
 


  };
}