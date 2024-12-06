interface post {
    id: number;
    title: string;
    const: string| null;
}

type NewPost = Omit<post, 'id' | 'const'> & {
    id?: number;
    content: string | null;
};