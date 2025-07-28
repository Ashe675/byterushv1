export const transformName = (name: string): string => {
    return name
        .split(' ')[0] + ' ' + (name
            .split(' ')[1] ?? '');
}