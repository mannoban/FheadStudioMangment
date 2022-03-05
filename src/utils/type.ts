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
    articleId: string | number,
    userId: string | number,
    title: string,
    content: string,
    imgFile: any,
    abstrct: string,
    coverType: string
    coverUrl: string,
    labelType: Array<string>,
    columnType: Array<string>,
    releaseType: string,
    type: string,
    publishDelayTime: string | number,
    date: any,
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
    }>;
}