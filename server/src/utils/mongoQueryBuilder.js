const queryBuilder = {

    getFindOptions({query}={}){
        
        const defaultLimit = 5
        const {
            fields=false,
            sort=false,
            page=1,
            limit=defaultLimit,
            ...rest
            } = query;
        const mongooseQuery      = this.extractQuery(rest)
        const mongooseProjection = this.extractSimpleProjection(fields)
        const mongooseSort       = this.extractSort(sort)
        const mongooseLimit      = this.extractLimit(limit)
        const mongooseSkip       = this.extractSkip(page,limit)

        const findObjectParams = {
            filter    :mongooseQuery,
            projection:mongooseProjection,
            options   :{
                ...mongooseSort,
                ...mongooseLimit,
                ...mongooseSkip
            }
        }
        console.log(findObjectParams)
        return findObjectParams

    },
    extractQuery(queryRest){
        return {...queryRest}
    },
    extractSort(sort){
        const sortOptions={}
        if(sort){
            if(sort.indexOf('-')>=0){
                const cleanParam=sort.slice(1,sort.length)
                sortOptions[cleanParam]=-1
              }else{
                sortOptions[sort]=1
            }
        }
        return {sort:sortOptions}
    },
    extractLimit(limit){
        return {limit}
    },

    extractSkip(page,limit){
        const offset = page>1?page:page-1
        const skip = offset*limit
        return {skip:skip}
    },
    extractSimpleProjection(fields){
        const projOptions={}
        if(fields){
            const fieldsList = fields.split(',');
            const onlyExclude = fieldsList.filter(elem=>elem.indexOf('-')>=0)
            onlyExclude.forEach((elem)=>{
                    const cleanParam=elem.slice(1,elem.length)
                    projOptions[cleanParam] = 0 ;
            })
        }
        return projOptions
    },
}

export default queryBuilder