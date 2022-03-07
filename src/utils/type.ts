export interface UserForm {
    email: string,
    password: string,
    identifyCode: string,
}

export interface RegisterForm {
    userName: string,
    email: string,
    password: string,
    identify: string,
    phone: string,
}

export interface ArticleForm {
    articleId: string,
    userId: string,
    title: string,
    content: string,
    abstrct: string,
    coverImgId: any
    label: Array<{}>, //文章标签
    column: Array<{}>,
    publishMethod: string,
    alreadyPublish: boolean,
    date: number,
    coverType: string
}

export interface AllColumnListData {
    columnList: Array<{
        id: number | string;
        sortNumber: number | string;
        title: string;
        isPublic: boolean;
        date: any;
    }>;
    dragging: any;
};


export interface MgmtArticleData {
    yearValue: string;
    monthValue: string;
    columnList: string;
    yearOptions: Array<{
        value: number | string;
        label: number | string;
    }>;
    monthOptions: Array<{
        value: number | string;
        label: number | string;
    }>;
    columnOptions: Array<{
        id: number;
        value: string;
        label: string;
    }>;
    articleList: Array<{
        userId: string;
        articleId: string;
        title: string;
        date: number;
        labelType: string;
        showAmount: number;
        readAmount: number;
        commentAmount: number;
        collectAmount: number;
        top: boolean
    }>;
    oldArticleId?: string
}


export interface ColumnArrObj {
    id: number;
    label: string;
    value: string;
}

export interface TopData {
    oldArticleId?: string,
    newArticleId: string
}

