module.exports = class favoriteWorkout {
    userId;
    ejerciseId;
    type_ejercise;
   
    
    constructor(
      userId = undefined,
      ejerciseId,
      type_ejercise,
    ) {
      this.userId = userId;
      this.ejerciseId = ejerciseId;
      this.type_ejercise = type_ejercise;
    }
    
    get userId() {
      return this.userId;
    }
    
    set userId(userId) {
      this.userId = userId;
    }
  
    get ejerciseId () {
      return this.ejerciseId ;
    }
    
    set ejerciseId (ejerciseId ) {
      this.ejerciseId  = ejerciseId ;
    }
  
    get type_ejercise() {
      return this.type_ejercise;
    }
    
    set type_ejercise(type_ejercise) {
      this.type_ejercise = type_ejercise;
    }
    
    
  };